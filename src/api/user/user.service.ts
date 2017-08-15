import { Component } from "@nestjs/common";
import { HttpException } from '@nestjs/core';

@Component()
export class UsersService {
    private users = [
        { id: 1, name: 'shi' },
        { id: 2, name: 'jinhua' },
        { id: 3, name: 'ha' }
    ];
    getAllUsers() {
        return Promise.resolve(this.users);
    }
    getUser(id: number) {
        const user = this.users.find((user) => user.id ===id);
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        return Promise.resolve(user);
    }
    addUser(user) {
        this.users.push(user);
        return Promise.resolve();
    }
}
