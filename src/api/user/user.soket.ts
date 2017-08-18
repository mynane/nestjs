import { UsersModel } from '../../model';

exports.register = function (socket) {
    UsersModel.schema.pre('save', (doc) => {
        console.log(doc)
    })
    onSave(socket, {message: 'err'});
    UsersModel.schema.post('save', function (doc) {
        console.log(doc)
        onSave(socket, doc);
    });
    UsersModel.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc) {
    socket.emit('thing:save', doc);
}

function onRemove(socket, doc) {
    socket.emit('thing:remove', doc);
}
