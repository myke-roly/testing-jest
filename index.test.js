import {
  sumar,
  sendError,
  fetchData,
  promiseFun,
  promiseFunReject,
  users,
  DB,
} from './';

describe('first steps', () => {
  test('should 1 + 5 to equal 6', () => {
    expect(sumar(1, 5)).toBe(6); //toBe retorna el resultado esperado
  });

  test('objects assignament', () => {
    const data = { name: 'Mike', age: 26 };
    data['nick'] = 'mykedev';
    expect(data).toEqual({ name: 'Mike', age: 26, nick: 'mykedev' });
  });

  test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).toBeCloseTo(0.3);
  });

  test('there is not N', () => {
    expect('first test').not.toMatch(/N/);
  });

  test('there is N', () => {
    expect('first test or Not').toMatch(/N/);
  });

  test('find Superman at the list of the super Heros', () => {
    const superHeros = ['Batman', 'Aquaman', 'Flash', 'Wonder Woman'];
    expect(superHeros).toContain('Batman');
    expect(new Set(superHeros)).toContain('Batman');
  });

  test('when recived an Error or a Throw', () => {
    expect(sendError).toThrow('Sending a error to test'); // le podemos pasar el mensaje excato
    expect(sendError).toThrow();
    expect(sendError).toThrow(Error);
  });

  //Callbacks
  test('Callback on asyncronus fech data', (done) => {
    function callback(data) {
      try {
        expect(data).toBe('Im a callback');
        done();
      } catch (error) {
        done(error);
      }
    }

    fetchData(callback);
  });

  test('Resolve Promises', async () => {
    promiseFun().then((response) => {
      expect(response).toBe('Im a promise!');
    });
  });

  test('Resolve c to resolves', () => {
    return expect(promiseFun()).resolves.toBe('Im a promise!');
  });

  test('Reject promise to rejects', () => {
    expect.assertions(1);
    return expect(promiseFunReject()).rejects.toThrow(Error);
  });

  test('Resolve Promises with async/await', async () => {
    const response = await promiseFun();
    expect(response).toBe('Im a promise!');
  });

  test('Resolve Promises combined async/await and .resolves', async () => {
    await expect(promiseFun()).resolves.toBe('Im a promise!');
  });

  test('Rejected Promises combined async/await and .rejects', async () => {
    expect.assertions(1);
    await expect(promiseFunReject()).rejects.toThrow(Error);
  });
});

describe('users', () => {
  const user = { id: 4, name: 'Dev', age: 25 };
  describe('Create users', () => {
    test('isUser function exist', () => {
      expect(users).toBeTruthy();
    });

    test('should not have a user', () => {
      expect(() => users.create()).toThrow(Error);
    });

    test('should Create user', () => {
      const newDB = [...DB, user];
      expect(users.create(user)).toEqual(newDB);
    });
  });

  describe('delete user', () => {
    test('isUser id not exists', () => {
      expect(() => users.delete(undefined)).toThrow(Error);
    });

    test('should do not modify the users if user not exist', () => {
      expect(users.delete(5)).toEqual(DB);
    });

    test('should be one less user', () => {
      const expectUsers = [DB[1], DB[2]];
      const expectUsers2 = [DB[0], DB[2]];
      expect(users.delete(0)).toEqual(expectUsers);
      expect(users.delete(1)).toEqual(expectUsers2);
    });
  });

  describe('', () => {
    test('should not be a user', () => {
      expect(() => users.edit(undefined)).toThrow(Error);
    });

    test('should not be user data', () => {
      expect(() => users.edit(0, _)).toThrow(Error);
    });

    test('should be one user modified', () => {
      const userData = { id: 0, name: 'Modified', age: 17 };
      const modifiedDB = [userData, DB[1], DB[2]];
      const sortUser = modifiedDB.sort((a, b) => a.id - b.id);
      expect(users.edit(0, userData)).toEqual(sortUser);
    });
  });
});
