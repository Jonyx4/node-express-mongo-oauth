import { catchErrors, notFound, developmentErrors, productionErrors } from '../../src/utils/errorHandler.js';

describe('Error Handler', () => {
  describe('catchErrors', () => {
    test('Given an existing async function when I call catchErrors then the function passed must be is called', async () => {
      const func = async (req, res, next) => {
        res.status(200).json('result');
      };
      const req = {};

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result).toBe('result');
        }
      };
      await expect(catchErrors(func)(req, res));
    });
  });

  describe('notFound', () => {
    test('Given an request and response case when I call notFound the returned message is Not Found', async () => {
      let value = '';
      const req = {};
      const res = {};
      const next = (error) => {
        value = error.message;
      };

      notFound(req, res, next);

      expect(value).toBe('Not Found');
    });
  });

  describe('developmentErrors', () => {
    test('Given an error in development environment when I call developmentErrors the returned status is 500', async () => {
      expect.assertions(2);

      const error = new Error('test error');

      const req = {};

      const res = {
        status(status) {
          expect(status).toBe(500);
          return this;
        },
        json(result) {
          expect(result.error.message).toBe(error.message);
        }
      };

      await developmentErrors(error, req, res);
    });
  });

  describe('productionErrors', () => {
    test('Given an error in production environment when I call developmentErrors the returned status is 500', async () => {
      expect.assertions(2);

      const error = new Error('production error');

      const req = {};

      const res = {
        status(status) {
          expect(status).toBe(500);
          return this;
        },
        json(result) {
          expect(result.error.message).toBe(error.message);
        }
      };

      await productionErrors(error, req, res);
    });
  });
});
