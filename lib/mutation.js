'use strict'

const connetDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCouse = Object.assign(defaults, input)
    let db, course
    try {
      db = await connetDb()
      course = await db.collection('courses').insertOne(newCouse)
      input._id = course.insertedId
      return input
    } catch (error) {
      errorHandler(error)
    }
  },
  editCourse: async (root, { _id, input }) => {
    let db, course
    try {
      db = await connetDb()
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) }, { $set: input })
      course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
      return course
    } catch (error) {
      errorHandler(error)
    }
  },
  deleteCourse: async (root, { _id }) => {
    let db, info
    try {
      db = await connetDb()
      info = await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
      return info.deletedCount ? 'Se elimino con exito' : `El id ${_id} no existe en la base de datos`
    } catch (error) {
      errorHandler(error)
    }
  },
  createPerson: async (root, { input }) => {
    let db, student
    try {
      db = await connetDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
      return input
    } catch (error) {
      errorHandler(error)
    }
  },
  editPerson: async (root, { _id, input }) => {
    let db, student
    try {
      db = await connetDb()
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) }, { $set: input })
      student = await db.collection('students').findOne({ _id: ObjectID(_id) })
      return student
    } catch (error) {
      errorHandler(error)
    }
  },
  deletePerson: async (root, { _id }) => {
    let db, info
    try {
      db = await connetDb()
      info = await db.collection('students').deleteOne({ _id: ObjectID(_id) })
      return info.deletedCount ? 'Se elimino con exito' : `El id ${_id} no existe en la base de datos`
    } catch (error) {
      errorHandler(error)
    }
  },
  addPeople: async (root, { courseID, personID }) => {
    let db, course
    try {
      db = await connetDb()
      if (!await db.collection('students').findOne({ _id: ObjectID(personID) })) { throw new Error('La persona no existe') }
      course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
      if (!course) { throw new Error('El curso no existe') }
      await db.collection('courses').updateOne({ _id: ObjectID(courseID) }, { $addToSet: { people: ObjectID(personID) } })
      return course
    } catch (error) {
      errorHandler(error)
    }
  }
}
