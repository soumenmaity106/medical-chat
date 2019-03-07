const Doctorlist = require('../models/doctorlist.model');

//Post a Doctorlist
exports.create = (req, res) => {
    //Create a Doctorlist 
    const doctorlist = new Doctorlist({
        doctor_id: req.body.doctor_id,
        department: req.body.department,
        speciality: req.body.speciality,
        doctor_name: req.body.doctor_name,
        designation: req.body.designation,
        profile_summary: req.body.profile_summary
    })
    //Save Doctorlist in Mogodb
    doctorlist.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

// FETCH all Doctorlist
exports.findAll = (req, res) => {
    Doctorlist.find()
        .then(doctorlist => {
            if (doctorlist.length <= 0) {
                return res.status(404).send({
                    message: "Doctorlist list Dtabase Empty "
                })
            }
            res.send({
                count: doctorlist.length,
                Doctorlist: doctorlist
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// FIND One Doctorlist
exports.findOne = (req, res) => {
    Doctorlist.findById(req.params.doctorlistId)
        .then(doctorlist => {
            if (!doctorlist) {
                return res.status(404).send({
                    message: "Doctorlist not found with id " + req.params.doctorlistId
                });
            }
            res.send(doctorlist);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Doctorlist not found with id " + req.params.doctorlistId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Doctorlist with id " + req.params.doctorlistId
            });
        });
};

//Search Doctorlist
exports.search = (req,res) =>{
    var findDoctorlist = {}

    if(req.query.hasOwnProperty("doctor_id")){
        if(req.query.doctor_id.length > 0){
            findDoctorlist.doctor_id = req.query.doctor_id
        }
    }

    if(req.query.hasOwnProperty("department")){
        if(req.query.department.length > 0){
            findDoctorlist.department = req.query.department
        }
    }

    if(req.query.hasOwnProperty("speciality")){
        if(req.query.speciality.length > 0){
            findDoctorlist.speciality = req.query.speciality
        }
    }

    if(req.query.hasOwnProperty("doctor_name")){
        if(req.query.doctor_name.length > 0){
            findDoctorlist.doctor_name = req.query.doctor_name
        }
    }

    if(req.query.hasOwnProperty("designation")){
        if(req.query.designation.length > 0){
            findDoctorlist.designation = req.query.designation
        }
    }

    if(req.query.hasOwnProperty("profile_summary")){
        if(req.query.profile_summary.length > 0){
            findDoctorlist.profile_summary = req.query.profile_summary
        }
    }

    Doctorlist.find(findDoctorlist)
    .then(doctorlist=>{
        if(doctorlist.length <= 0){
            return res.status(404).send({
                message: "Sorry I don’t know the answer to your search. Please ask a different one." 
            })
        }
        res.send({
            count:doctorlist.length,
            Doctorlist:doctorlist
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
    
}
