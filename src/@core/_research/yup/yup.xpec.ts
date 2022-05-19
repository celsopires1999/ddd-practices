import * as yup from "yup";

const fetchUser = async () => {
  return {
    name: "user name",
    age: 99,
    email: "user@provider.com",
    website: "http://www.somewhere.com",
  };
};

describe("Test", () => {
  test("Learning yup", async () => {
    let userSchema = yup.object({
      name: yup.string().required(),
      age: yup.number().required().positive().integer(),
      email: yup.string().email(),
      website: yup.string().url().nullable(),
      createdOn: yup.date().default(() => new Date()),
    });

    // parse and assert validity
    const user = await userSchema.validate(await fetchUser(), { strict: true });

    type User = yup.InferType<typeof userSchema>;
    /* {
      name: string;
      age: number;
      email?: string | undefined
      website?: string | null | undefined
      createdOn: Date
    }*/

    console.log(user);
  });

  test("Locale", async () => {
    yup.setLocale({
      mixed: {
        default: "Não é válido",
        notType: "Tipo inválido",
      },
      number: {
        min: "Deve ser maior que ${min}",
      },
    });

    // now use Yup schemas AFTER you defined your custom dictionary
    let schema = yup.object().shape({
      name: yup.string(),
      age: yup.number().min(18),
    });

    try {
      await schema.validate(
        { name: 22, age: 11 },
        { abortEarly: false, strict: true }
      );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      // console.log(e.name); // => 'ValidationError'
      // console.log(e.errors); // => ['Deve ser maior que 18']
      // console.log(e);
      // console.log("path: ", e.path);
      e.inner.forEach((error) => {
        console.log("message: ", error.message);
        console.log("path: ", error.path);
      });
    }
  });
});
