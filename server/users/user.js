import express from "express";

const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(
        (user) => user.room === room && user.name === name
    );

    if (existingUser) {
        return { error: "user alredy exist" };
    }
};

const removeUser = ({ id }) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.findOne((user) => user.id === id);

const getUsersInRooms = (room) => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRooms };