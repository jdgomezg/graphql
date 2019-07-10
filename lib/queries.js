'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')
module.exports = {

  getCourses: async () => {
    let db; let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
      return courses
    } catch (error) {
      errorHandler(error)
    }
  },
  getCourse: async (root, { id }) => {
    let db, course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      return course
    } catch (error) {
      errorHandler(error)
    }
  },
  getPeople: async () => {
    let db; let students = []
    try {
      db = await connectDb()
      students = await db.collection('students').find().toArray()
      return students
    } catch (error) {
      errorHandler(error)
    }
  },
  getPerson: async (root, { id }) => {
    let db, student
    try {
      db = await connectDb()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
      return student
    } catch (error) {
      errorHandler(error)
    }
  },
  searchItem: async (root, { keyword }) => {
    let db, courses, people
    try {
      db = await connectDb()
      courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray()
      people = await db.collection('students').find({ $text: { $search: keyword } }).toArray()
      return [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
  }
}
