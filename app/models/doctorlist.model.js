const mongoose = require('mongoose');

const DoctorListSchema = mongoose.Schema({
    doctor_id: String,
    department: String,
    speciality: String,
    doctor_name: String,
    designation: String,
    profile_summary:String,
});

module.exports = mongoose.model('DoctorList', DoctorListSchema);