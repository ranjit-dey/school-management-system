// bcrypt is used for hashing and comparing passwords
const bcrypt = require("bcrypt");

// Importing Mongoose models for various entities in the system
const Admin = require("../models/adminSchema.js");
const Sclass = require("../models/sclassSchema.js");
const Student = require("../models/studentSchema.js");
const Teacher = require("../models/teacherSchema.js");
const Subject = require("../models/subjectSchema.js");
const Notice = require("../models/noticeSchema.js");
const Complain = require("../models/complainSchema.js");

const adminRegister = async (req, res) => {
  try {
    // Hash the incoming password using 10 rounds of salt for security
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // Create a new Admin instance, spreading the request body and overwriting password with the hashed value
    const admin = new Admin({
      ...req.body,
      password: hashedPass,
    });

    // Check if an admin with the given email already exists
    const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
    // Check if an admin with the given school name already exists
    const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

    if (existingAdminByEmail) {
      // Send error if the email already exists in the database
      res.send({ message: "Email already exists" });
    } else if (existingSchool) {
      // Send error if the school name already exists in the database
      res.send({ message: "School name already exists" });
    } else {
      // Save the new admin document to the database
      let result = await admin.save();
      // Remove the password from the result before sending the response
      result.password = undefined;
      res.send(result);
    }
  } catch (err) {
    // Handle any unexpected errors by sending a 500 status code and the error details
    res.status(500).json(err);
  }
};

/**
 * Function: adminLogIn
 * --------------------
 * Logs in an admin user.
 *  - Validates that email and password are provided.
 *  - Retrieves the admin using the email from the database.
 *  - Compares the provided password with the stored hashed password.
 *  - If valid, removes the password from the response and sends the admin data.
 */
const adminLogIn = async (req, res) => {
  // Check if both email and password are provided in the request body
  if (req.body.email && req.body.password) {
    // Find the admin in the database by email
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      // Compare the provided password with the hashed password stored in the admin document
      const validated = await bcrypt.compare(req.body.password, admin.password);
      if (validated) {
        // Remove the password field before sending the admin object as a response
        admin.password = undefined;
        res.send(admin);
      } else {
        // Password did not match, send an error message
        res.send({ message: "Invalid password" });
      }
    } else {
      // No admin found with the provided email
      res.send({ message: "User not found" });
    }
  } else {
    // Email or password not provided in the request
    res.send({ message: "Email and password are required" });
  }
};


 // Function: getAdminDetail

const getAdminDetail = async (req, res) => {
  try {
    // Find the admin by ID (provided in req.params)
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      // Remove the password field for security before sending the admin data
      admin.password = undefined;
      res.send(admin);
    } else {
      // No admin found with the given ID
      res.send({ message: "No admin found" });
    }
  } catch (err) {
    // Handle errors and send a 500 status code with error details
    res.status(500).json(err);
  }
};

// Function: updateAdmin

const updateAdmin = async (req, res) => {
  try {
    // If the password field is present in the request body, hash it before updating
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
//       // NOTE: Ensure you update req.body.password, not res.body.password
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    // Update the admin document with new data and return the updated document
    let result = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

//     // Remove the password field from the returned document for security
    result.password = undefined;
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { adminRegister, adminLogIn, getAdminDetail, updateAdmin };
