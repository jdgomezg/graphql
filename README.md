GRAPHQL

Schema -> me define que va hacer mi API en graphql
resolvers -> es la definicion que se asocia al esquema para tener los elemenos que se van a devolver
Query -> ejecucion de consulta tipo select a un esquema
mutation-> ejecucion de inserciones o modificaciones (update, delete) a un esquema
nestedTypes-> almacenar un tipo dentro de otro tipo
Alias-> permite renombrar consultas para ejecutar varias a la vez e identificar sus resultados
fragments-> permite crear un fragmento de codigo(consulta) que se puede reutilizar en otras consultas
variables-> permite definir las variables para nuestros query y no tener valores quemados, se definen $nombreVariable
Enums -> escalar permitido por graphql asi como String, Integer, Float, Boolean y ID
Interface-> permite definir una estructura de datos que puede ser compartida por objetos con similitud de estructuras
Directives-> permite agregar condiciones a nuestros queries(include, skip)
@deprecated -> indica que un campo no va a estar disponible que ya no es util
Unions-> me permite agrupar todos los tipos que quiera sin que tengan campos en comun
indices -> para crear un indice sobre courses se usa el siguiente comando sobre la base de datos
db.courses.createIndex({"$**": "text"}) -> esto traduce que cree un indice sobre cualquier campo y que se llame text
<--- Consultas --->
#query variables
{
  "monitorInput": {
    "name": "monitor 1",
    "email": "monitor@yopmail.com",
    "phone": "31838988250"
  }
}
#consulta
mutation createNewMonitor($monitorInput: PersonInput!){
  createPerson(input:$monitorInput){
    _id
    name
    email
  }
}

query getPeopleData($monitor: Boolean!, $avatar: Boolean!){
   getPeople{
    _id
    name
    ... on Monitor @include(if:$monitor){
      phone
    }
    ... on Student @skip(if:$avatar){
      avatar
      email
    }
  }
}
#keyword puede ser una frase completa o un fragmento
{
  searchItem(keyword:"Mi profesor"){
    __typename
    ... on Course{
      title
      description
    }
    ... on Student{
      name
      email
    }
    ... on Monitor{
      name
      phone
    }
  }
}

{
  getPeople{
    _id
    name
    email
    ... on Monitor {
      phone
    }
    ... on Student {
      avatar
    }
  }
}

{
  getAll: getCourses{
    ...CourseFields
    teacher
    people{
      _id
      name
      email
    }
  }
  
  getOne: getCourse(id:"5d1f718f1c9d440000670690"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course{
  _id
  title
  description
  people{
      _id
      name
      email
    }
}

mutation{
  createStudent(input:{
    name:"Juan David Gomez Gomez"
    email:"jugomez3@gmail.com"
  }){
    _id
    name
    email
  }
}

mutation{
  editStudent(_id: "5d24ba06819dc45230af42d5", input:{
    name:"Juan David Gómez Gómez"
  }){
    _id
    name
  }
}

mutation{
  deleteStudent(_id: "5d24e0d332c78d4190f7be56")
}

{
  getStudent(id:"5d24ba06819dc45230af42d5"){
    _id
    name
    email
  }
}

{
  getStudents{
    _id
    name
    email
  }
}

{
  getCourses{
    _id
    title
    teacher
    people{
      _id
      name
      email
    }
  }
}

mutation{
  createCourse(input:{
    title: "Administracion de BD"
    teacher:"Jorge Ivan Triviño"
    description:"Bases de datos"
    topic:"Programacion"
  }){
    _id
  }
}

# preparacion de la app para produccion
configurar cors para acceder la app desde otros lugares que no sea localhost para eso se usa el middleware de corsde express

#cliente para graphql
->fetchQL
->graphql-request <- mas sencillo de usar
->apollo client -> mas completo esta en version vue.js(vue apollo) y angular(apollo angular) 
->Relay -> es la forma que usa Facebook
