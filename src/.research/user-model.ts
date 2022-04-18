import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: false,
})
export default class User extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;
}
