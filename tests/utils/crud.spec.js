import mongoose from 'mongoose';
import { findById, find, create, updateOne, removeOne } from '../../src/utils/crud.js';
import List from '../../src/resources/list/listModel.js';

describe('crud controllers', () => {
  describe('findById', () => {
    test('Given an existing list when I get it by id then it is listed', async () => {
      expect.assertions(2);

      const list = await List.create({ name: 'list' });
      const { _id } = list;

      const req = {
        params: {
          id: _id
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result.data._id.toString()).toBe(_id.toString());
        }
      };

      await findById(List)(req, res);
    });

    test('Given an invalid input when I get it by id then a 404 data not found error is returned', async () => {
      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        }
      };

      const res = {};

      await expect(findById(List)(req, res)).rejects.toThrow('Data not found');
    });
  });

  describe('find', () => {
    test('Given and existing list when I query all lists then all lists are returned', async () => {
      expect.assertions(2);

      await List.create({ name: 'list' });

      const req = {};
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result.data.length).toBeGreaterThan(0);
        }
      };

      await find(List)(req, res);
    });

    test('Given no existing lists when I query all then a 404 no doc was found is returned', async () => {
      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        }
      };

      const res = {};

      await expect(find(List)(req, res)).rejects.toThrow('Data not found');
    });
  });

  describe('create', () => {
    test('Given a valid list when I create it then the list is created and returned', async () => {
      expect.assertions(2);

      const newItem = await List.create({ name: 'newItem' });

      const req = {
        body: newItem
      };

      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        json(result) {
          expect(result.data).toBe(newItem);
        }
      };

      await create(List)(req, res);
    });
  });

  describe('updateOne', () => {
    const newName = 'new Name';
    test('Given a valid list when I update it by id then the list is updated and returned', async () => {
      expect.assertions(2);

      const list = await List.create({ name: 'list' });
      const { _id } = list;

      const req = {
        params: {
          id: _id
        },
        body: {
          name: newName
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result.data.name).toBe(newName);
        }
      };

      await updateOne(List)(req, res);
    });

    test('Given no existing lists when I try to update one by id then a 404 Data not found error is returned', async () => {
      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        },
        body: {
          name: newName
        }
      };

      const res = {};

      await expect(updateOne(List)(req, res)).rejects.toThrow('Data not found');
    });
  });

  describe('removeOne', () => {
    test('Given an existing list when I remove ir by id then the list is removed', async () => {
      expect.assertions(2);

      const list = await List.create({ name: 'list' });
      const { _id } = list;

      const req = {
        params: {
          id: _id
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result.data.name).toBe('list');
        }
      };

      await removeOne(List)(req, res);
    });

    test('Given no existing lists when I try to delete one by id then a 404 Data not found error is returned', async () => {
      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        }
      };

      const res = {};

      await expect(removeOne(List)(req, res)).rejects.toThrow('Data not found');
    });
  });
});