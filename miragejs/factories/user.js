/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */
import faker from 'faker';
import { Factory } from 'miragejs';
import { randomNumber } from './utils';

/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */

export default {
  user: Factory.extend({
    name() {
      return faker.fake('{{name.findName}}');
    },
    email() {
      return faker.fake('{{internet.email}}');
    },
    mobile() {
      return faker.fake('{{phone.phoneNumber}}');
    },
    password() {
      return '123456789';
    },
    afterCreate(user, server) {
      const messages = server.createList('message', randomNumber(10), { user });

      user.update({ messages });
    },
  }),
};
