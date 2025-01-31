import axios from 'axios';
import moment from "moment"
import nodemailer from "nodemailer";
import Mailgen from "mailgen";



export const getbill = async (req, res) => {
  try {
    
    const { firstName, middleName, email, dob, cardHolderName, cardNumber, cardDetails, address, country, state, city, postalCode, flight, adt, ift, chd, grandTotal } = req.body;
    const { flyFrom, flyTo, cityFrom, cityTo, price } = flight;

    if (!email) {
      return res.status(201).json({
        message: "User email is required",
      });
      // return res.status(400).json({ error: "User email is required." });
    }

    const adminEmail = process.env.EMAIL; // Admin email from environment variables

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Mailgen configuration
    const MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Zuber International India Private Limited",
        link: "https://www.zuberinternational.com/",
      },
    });

    const response = {
      body: {
        name: `${firstName} ${middleName || ''}`,
        intro: `Dear ${firstName}, thank you for reaching out to Zuber International India Private Limited!`,
        table: {
          data: [
            { item: "Personal Information" },
            { item: "Full Name", description: `${firstName} ${middleName || ''}` },
            { item: "Email", description: email },
            { item: "Date of Birth", description: dob },
            { item: "Card Details" },
            { item: "Card Holder Name", description: cardHolderName },
            { item: "Card Number", description: cardNumber },
            { item: "Card Details", description: cardDetails },
            { item: "Address Information" },
            { item: "Address", description: address },
            { item: "Country", description: country },
            { item: "State", description: state },
            { item: "City", description: city },
            { item: "Postal Code", description: postalCode },
            { item: "Travel Information" },
            { item: "From", description: `${cityFrom} (${flyFrom})` },
            { item: "To", description: `${cityTo} (${flyTo})` },
            { item: "Adult", description: adt },
            { item: "Children", description: chd },
            { item: "Infant", description: ift },
            { item: "Total Price", description: grandTotal.toFixed(2) },
          ],
        },
        outro: "Looking forward to doing more business with you.",
      },
    };

    const mailContent = MailGenerator.generate(response);

    const userMessage = {
      from: process.env.EMAIL,
      to: email,
      subject: "New Request from Zuber International India Pvt Ltd",
      html: mailContent,
    };

    const adminMessage = {
      from: process.env.EMAIL,
      to: adminEmail,
      subject: "New Request from Zuber International India Pvt Ltd",
      html: mailContent,
    };

    // Send emails in parallel
    const sendEmails = async () => {
      const userMailPromise = transporter.sendMail(userMessage);
      const adminMailPromise = transporter.sendMail(adminMessage);

      // Wait for both emails to be sent in parallel
      await Promise.all([userMailPromise, adminMailPromise]);
    };

    await sendEmails();

    return res.status(201).json({
      message: "A new email has been sent successfully.",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      error: "An unexpected error occurred.",
    });
  }
};

// Function to get the access token using client credentials
export const getAccessToken = async () => {
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Unable to fetch access token');
  }
};

// Function to get location suggestions from Amadeus API
// export const getLocations = async (req, res) => {
//   try {
//     const { keyword } = req.query; 

//     const accessToken = await getAccessToken();


//     const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
//       params: {
//         subType: 'CITY,AIRPORT',
//         keyword,

//       },
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });


//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching locations:', error);
//     res.status(500).json({ error: 'Unable to fetch locations' });
//   }
// };
export const getLocations = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await axios.get('https://www.baratoflight.us/api/airport_data.json', {
      params: {
        subType: 'CITY,AIRPORT',
        keyword,
      },
    });
    const flightLocations = response.data;

    // Filter locations based on the keyword
    const filteredLocations = flightLocations.filter(location =>
      location.toLowerCase().includes(keyword.toLowerCase())
    );

    res.json(filteredLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Unable to fetch locations' });
  }
};

export const flightResultController = async (req, res) => {

  try {

    const { source, destination, date, adults, children, infants,rtnDate,trpType, class: travelClass } = req.query;
    

    const rSource = source.split('-')[0]
    const rDest = destination.split('-')[0]
    const formattedDate = moment(date, "YYYY-MM-DD").format("MMM-DD-YYYY");
    const returnDate = moment(rtnDate, "YYYY-MM-DD").format("MMM-DD-YYYY");

     let apiUrl = `https://cloudapi.wikiproject.in/flight/?currency=USD&JType=${trpType}&org=${rSource}&dest=${rDest}&depDt=${formattedDate}&adt=${adults}&chd=${children}&inf=${infants}&ct=M&userid=dash&password=JMD5fky8&metaId=2020&website=baratoflight&limit=100`;

     // Include return date for roundtrip
     if (trpType === "roundtrip" && returnDate) {
       apiUrl += `&retDt=${returnDate}`;
     }
 
     

     const response = await axios.get(apiUrl);

     res.json(response.data);
     

    // https://cloudapi.wikiproject.in/flight/?currency=USD&JType=oneway&org=DEL&dest=BLR&depDt=Dec-30-2024&adt=1&chd=0&inf=0&ct=M&userid=dash&password=JMD5fky8&metaId=2020&website=baratoflight&limit=100
    // const response = await axios.get(`https://cloudapi.wikiproject.in/flight/?currency=USD&JType=oneway&org=DEL&dest=BLR&depDt=${date}&adt=${adults}&chd=${children}&inf=${infants}&ct=M&userid=dash&password=JMD5fky8&metaId=2020&website=baratoflight&limit=100`);

    // const response = await axios.get(`https://cloudapi.wikiproject.in/flight/?currency=USD&JType=${trpType}&org=${rSource}&dest=${rDest}&depDt=${formattedDate}&adt=${adults}&chd=${children}&inf=${infants}&ct=M&userid=dash&password=JMD5fky8&metaId=2020&website=baratoflight&limit=100`)
    // res.json(response.data);
    

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching the results",
      error
    })
  }
}




export const exchangeRateController = async(req, res) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    res.json(response.data);
    
    
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({ error: 'Unable to fetch exchange rates' });
  }
}

