const express = require('express');
const fs = require('fs');

let app = express();

app.get('/', (request, response) => {
    response.send('hello world')
})

app.get('/class/add/', (request, response) => {
    let subject = request.query.class;
    let name = request.query.name;
    let age = request.query.age;
    let city = request.query.city; 
    let grade = request.query.grade

    let student = {
        name,
        age,
        city,
        grade //since the key and value are the exact same name we dont need the :
    }

    if (name === '' ||
        age === '' ||
        city === '' ||
        grade === '') {
        response.send({
            error: 'Please fill out all the information for the student'
        })
    }

    fs.readFile(`classes/${subject}.json`, (err, data) => {
        if (err) {
            let kids = {
                students: [student]
            }

            fs.writeFile(`classes/${subject}.json`, JSON.stringify(kids), err => {
                if (err) {
                    throw err;
                }
            })
        }
        else{
            let newData = JSON.parse(data);
            
            newData.students.push(student)

            console.log(newData)

            fs.writeFile(`classes/${subject}.json`, JSON.stringify(newData), err => {
                if (err) {
                    throw err;
                }
            })
            
        }
        response.send({ 
            added: student,
            class: subject
        })
    })

    // response.send(student)
})

app.listen(5000);