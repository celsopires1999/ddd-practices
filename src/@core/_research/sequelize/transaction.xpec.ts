import { Sequelize } from "sequelize-typescript";
import UserModel from "./user-model";

describe("test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([UserModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("test", async () => {
    // First, we start a transaction and save it into a variable
    const transaction = await sequelize.transaction();

    try {
      // Then, we do some calls passing this transaction as an option:

      const user1 = await UserModel.create(
        {
          name: "Suzane",
        },
        { transaction }
      );

      const user2 = await UserModel.create(
        {
          name: "Gauthinho",
        },
        { transaction }
      );

      console.log(`I have created two users: ${user1.name} and ${user2.name}`);

      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await transaction.commit();
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback();
    }
  });
});
