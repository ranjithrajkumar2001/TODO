const router = require(".")
const connection = require("../database")
const express = require("express");
const { status, sendStatus, type } = require("express/lib/response");
const app = express()
//Routes

//Add new Item in TODO list
app.post('/', function (req, res) {
        try{
                let todo = req.body;
                if (Object.keys(todo).length === 0  ) {
                return res.status(400).send({ message: 'PLEASE PROVIDE REQUIRED DATA' });
                }
                connection.query("INSERT INTO todolist SET ? ", { todo_list:todo["todo_list"] }, function (error, results, fields) {
                if (error)
                {
                        
                        return res.status(500).send({message:error.sqlMessage})
                }
                else
                {
                        return res.status(201).send({message: 'NEW TODO ITEM CREATED'})
                }
                });
        }
        catch(error)
        {
                return res.sendStatus(500)
        }
        });

//Get All the Item from TODO list
app.get('/', function (req, res) {
        connection.query('SELECT * FROM todolist ORDER BY id', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
        });
        });

//Get Item by Id
app.get('/:id', function (req, res) {
        try
        {
                let todo_id = req.params.id;
                connection.query('SELECT * FROM todolist where id=?', [todo_id], function (error, results, fields) {
                if(results == '')
                {
                        return res.status(404).send({message: 'ID NOT FOUND PLEASE ENTER VALID ID'});
                }
                return res.send(results);
                });
        }
        catch (e)
        {
                return res.status(404).send({message: 'ID NOT FOUND PLEASE ENTER VALID ID'});
        }
        });

//Update Todo
app.put('/', function (req, res) {
        try
        {
                let id = req.body.id;
                let todo = req.body.todo_list;
                if (todo == undefined || id == undefined) 
                {
                        return res.status(400).send({ message: 'PLEASE PROVIDE REQUIRED DATA' });
                }
                connection.query('SELECT * FROM todolist where id=?', [id], function (error, results, fields) {
                        if(results == '')
                        {
                                return res.status(404).send({message: 'ID NOT FOUND'});
                        }
                        else
                        {
                                connection.query("UPDATE todolist SET todo_list = ? WHERE id = ?", [todo, id], function (error, results, fields) {
                                if (error)
                                {
                                        return res.status(400).send({message: 'PLEASE ENTER VALID ID'})
                                }
                                return res.status(200).send({message: 'UPDATED SUCCESSFULLY'})
                                });  
                        }
                });
                
        }
        catch(error)
        {
                return res.status(400).send({message: 'PLEASE ENTER VALID ID'})
        }
        });
 
//Delete Todo        
app.delete('/:id', function (req, res) {
        let todo_id = req.params.id;
        try 
        {
                connection.query('DELETE FROM todolist WHERE id = ?', [todo_id], function (error, results, fields) {
                        if (error) throw error;
                        if(results.affectedRows == 0)
                        {
                                return res.status(404).send({message: 'GIVEN ID NOT FOUND ENTER VALID ID'});
                        }
                return res.status(200).send({message: 'TODO HAS BEEN DELETED SUCCESSFULLY.' });
                });
        } catch (error) 
        {
               return res.status(400).send({message: 'ENTER VALID ID'});
        }
       
        });
        
        
module.exports = app;