const DoctorHoure = require('../models/doctorhoure.model');
const Doctorlist = require('../models/doctorlist.model');

//Post a DoctorHoure
exports.create = (req, res) => {
    //Create a DoctorHoure 
    
    const doctorhoure = new DoctorHoure({
        doctor_id: req.body.doctor_id,
        day_of_week: req.body.day_of_week,
        from_hour: req.body.from_hour,
        to_hour: req.body.to_hour,
        medical_center_name: req.body.medical_center_name,
    })
    //Save DoctorHoure in Mogodb
    doctorhoure.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

// FETCH all DoctorHoure
exports.findAll = (req, res) => {
    DoctorHoure.find()
        .populate('doctor_id')
        .then(doctorhoure => {
            if (doctorhoure.length <= 0) {
                return res.status(404).send({
                    message: "DoctorHoure list Dtabase Empty "
                })
            }
            res.send({
                count: doctorhoure.length,
                doctorhoure: doctorhoure
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// FIND One DoctorHoure
exports.findOne = (req, res) => {
    DoctorHoure.findById(req.params.doctorhoureId)
        .then(doctorhoure => {
            if (!doctorhoure) {
                return res.status(404).send({
                    message: "DoctorHoure not found with id " + req.params.doctorhoureId
                });
            }
            res.send(doctorhoure);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "DoctorHoure not found with id " + req.params.doctorhoureId
                });
            }
            return res.status(500).send({
                message: "Error retrieving DoctorHoure with id " + req.params.doctorhoureId
            });
        });
};

//Search DoctorHoure
exports.search = (req,res) =>{
    var findDoctorHoure = {}

    if(req.query.hasOwnProperty("doctor_id")){
        if(req.query.doctor_id.length > 0){
            findDoctorHoure.doctor_id = req.query.doctor_id
        }
    }

    if(req.query.hasOwnProperty("day_of_week")){
        if(req.query.day_of_week.length > 0){
            findDoctorHoure.day_of_week = req.query.day_of_week
        }
    }
    if(req.query.hasOwnProperty("from_hour")){
        if(req.query.from_hour.length > 0){
            findDoctorHoure.from_hour = req.query.from_hour
        }
    }
    if(req.query.hasOwnProperty("to_hour")){
        if(req.query.to_hour.length > 0){
            findDoctorHoure.to_hour = req.query.to_hour
        }
    }
    if(req.query.hasOwnProperty("medical_center_name")){
        if(req.query.medical_center_name.length > 0){
            findDoctorHoure.medical_center_name = req.query.medical_center_name
        }
    }

    DoctorHoure.find(findDoctorHoure)
    .populate('doctor_id')
    .then(doctorhoure=>{
        if(doctorhoure.length <= 0){
            return res.status(404).send({
                message: "Sorry I don’t know the answer to your search. Please ask a different one." 
            })
        }
        res.send({
            count:doctorhoure.length,
            doctorhoure:doctorhoure
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
    
}
