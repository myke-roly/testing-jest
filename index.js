export function sumar(num1, num2) {
  return num1 + num2;
}

export function sendError() {
  throw new Error('Sending a error to test');
}

export const fetchData = (callback) => {
  return callback('Im a callback');
};

export const promiseFun = () => {
  return Promise.resolve('Im a promise!');
};

export const promiseFunReject = () => {
  return Promise.reject(new Error('Rejected!'));
};

export const DB = [
  { id: 0, name: 'Mike', age: 26 },
  { id: 1, name: 'Joel', age: 25 },
  { id: 2, name: 'Kevin', age: 18 },
];

export const users = {
  create: (user) => {
    if (!user) {
      throw new Error('no hay un usuario');
    }

    const { id, name, age } = user;
    if (!id || !name || !age) {
      throw new Error('los campos no pueden estar vacios');
    }

    return [...DB, user];
  },

  delete: (id) => {
    if (id === undefined) {
      throw new Error('Ingrese un id');
    }

    return DB.filter((user) => user.id !== id);
  },

  edit: (id, userModified) => {
    if (id === undefined) {
      throw new Error('no existe el usuario');
    }

    if (!userModified) {
      throw new Error('los campos son obligarorios');
    }

    DB.splice(id, 1, userModified);
    return DB;
  },
};
