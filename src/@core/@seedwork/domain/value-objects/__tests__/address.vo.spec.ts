import Address from "../address.vo";

describe("Address Value Object Unit Test", () => {
  it("should create an address value object", () => {
    const vo = new Address({
      street: "Street Test",
      number: 333,
      zip: "55555",
      city: "City Test",
    });
    expect(vo.value).toStrictEqual({
      street: "Street Test",
      number: 333,
      zip: "55555",
      city: "City Test",
    });
  });

  it("should throw exception", () => {
    const arrange = [
      {
        street: "",
        number: 333,
        zip: "55555",
        city: "City Test",
        error: "street is required",
      },
      {
        street: null,
        number: 333,
        zip: "55555",
        city: "City Test",
        error: "street is required",
      },
      {
        street: undefined,
        number: 333,
        zip: "55555",
        city: "City Test",
        error: "street is required",
      },
      {
        street: "Street Test",
        number: 0,
        zip: "55555",
        city: "City Test",
        error: "number is required",
      },
      {
        street: "Street Test",
        number: null,
        zip: "55555",
        city: "City Test",
        error: "number is required",
      },
      {
        street: "Street Test",
        number: undefined,
        zip: "55555",
        city: "City Test",
        error: "number is required",
      },
      {
        street: "Street Test",
        number: 333,
        zip: "",
        city: "City Test",
        error: "zip is required",
      },
      {
        street: "Street Test",
        number: 333,
        zip: null,
        city: "City Test",
        error: "zip is required",
      },
      {
        street: "Street Test",
        number: 333,
        zip: undefined,
        city: "City Test",
        error: "zip is required",
      },
      {
        street: "Street Test",
        number: 333,
        zip: "55555",
        city: "",
        error: "city is required",
      },
      {
        street: "Street Test",
        number: 333,
        zip: "55555",
        city: null,
        error: "city is required",
      },
      {
        street: "Street Test",
        number: 333,
        zip: "55555",
        city: undefined,
        error: "city is required",
      },
    ];

    arrange.forEach((item) => {
      expect(
        () =>
          new Address({
            street: item.street,
            number: item.number,
            zip: item.zip,
            city: item.city,
          })
      ).toThrowError(item.error);
    });
  });
});
