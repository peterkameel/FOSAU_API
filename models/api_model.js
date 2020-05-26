const mongoose = require('mongoose');

//mongoose Schema
const SemesterSchema = mongoose.Schema({
    id: Number,
    userid: String,
    name: String,
    note: String
}, {
        versionKey: false,
        collection: 'semester'
    });

const CourseSchema = mongoose.Schema({
    id: Number,
    userid: String,
    semesterid: String,
    name: String,
    deg: String,
    hour: String
}, {
    versionKey: false,
        collection: 'course'
    });

//mongoose model
const Semester = mongoose.model('semester', SemesterSchema);
const Course = mongoose.model('course', CourseSchema);

//restore function
exports.restore = async (req, res) => {
    let courses = await restoreCourses(req);
    Semester.find({ userid: req.body.userid })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.json({
                    error: false,
                    massage: 'Backup Restored',
                    semester: result,
                    course: courses
                });
            }
            else res.json({
                error: true,
                massage: 'Backup Not Found',
            });
        });
};
const restoreCourses = (req) => {
    return Course.find({ userid: req.body.userid })
        .exec()
        .then(result => {
            if (result.length > 0) return result;
            else return null;
        });
};


//sync semesters
const updateSemester = (item) => {
    const query = { id: item.id, userid: item.userid };
    Semester.findOneAndUpdate(query, {
        id: item.id,
        name: item.name,
        note: item.note
    }).exec().then(ress => {
        console.log(ress);
    }).catch(error => { console.log(error) });
};
const interSemester = (item) => {
    const semes = new Semester({
        id: item.id,
        userid: item.userid,
        name: item.name,
        note: item.note
    });
    semes.save().then(resul => {
        console.log(resul);
    }).catch(error => { console.log(error) });
};
exports.syncs = (item) => {
    Semester.find({ _id: item._id, userid: item.userid })
        .exec()
        .then(result => {
            if (result.length > 0) {
                updateSemester(item);
                console.log(item._id + '  updated');
            } else {
                interSemester(item);
                console.log(item._id + '  saved');
            };
        }).catch(error => { console.log(error) });
};

//sync courses
const updateCourse = (item) => {
    const query = { id: item.id, semesterid: item.semesterid, userid: item.userid };
    Course.findOneAndUpdate(query, {
        id: item.id,
        userid: item.userid,
        semesterid: item.semesterid,
        name: item.name,
        deg: item.deg,
        hour: item.hour
    }).exec().then(ress => {
        console.log(ress);
    }).catch(error => { console.log(error) });
};
const interCourse = (item) => {
    const cours = new Course({
        id: item.id,
        userid: item.userid,
        semesterid: item.semesterid,
        name: item.name,
        deg: item.deg,
        hour: item.hour
    });
    cours.save().then(resul => {
        console.log(resul);
    }).catch(error => { console.log(error) });
};
exports.syncC = (item) => {
    Course.find({ _id: item._id, semesterid: item.semesterid, userid: item.userid })
        .exec()
        .then(result => {
            if (result.length > 0) {
                updateCourse(item);
                console.log(item._id + '  updated');
            } else {
                interCourse(item);
                console.log(item._id + '  saved');
            };
        }).catch(error => { console.log(error) });
};



