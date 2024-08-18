import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    birthdate: {
        type: Date,
        required: [true, 'birthdate is required'],
    },
    position: {
        type: String,
        required: [true, 'position is required'],
    },
    active: {
        type: Boolean,
        default: true,
    },
});

employeeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});

export const EmployeeModel = mongoose.model('Employee', employeeSchema);
