const mongoose = require('mongoose'), Schema = mongoose.Schema;
const DoctorHoursSchema = mongoose.Schema({
    doctor_id: {type:Schema.Types.ObjectId, ref:'DoctorList'},
    day_of_week: String,
    from_hour: String,
    to_hour: String,
    medical_center_name: String,
});

module.exports = mongoose.model('DoctorHours', DoctorHoursSchema);