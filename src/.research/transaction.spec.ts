import { Sequelize } from "sequelize-typescript";
import User from "./user-model";

describe("test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([User]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("test", async () => {
    // First, we start a transaction and save it into a variable
    const t = await sequelize.transaction();

    try {
      // Then, we do some calls passing this transaction as an option:

      const user = await User.create(
        {
          name: "Bart",
        },
        { transaction: t }
      );

      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await t.commit();
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await t.rollback();
    }
  });
});
