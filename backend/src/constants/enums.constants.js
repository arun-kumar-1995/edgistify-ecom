export const createEnums = (values) => {
  const enumObject = Object.freeze(values);
  return {
    ...enumObject,
    values: Object.values(enumObject), 
  };
};

// Define and export enums
export const UserRoles = createEnums({
  USER: "User",
  ADMIN: "Admin",
  SELLER: "Seller",
});

export const AccountStatus = createEnums({
  PENDING: "Pending",
  ACTIVE: "Active",
  BLOCKED: "Blocked",
  DEACTIVATED: "Deactivated",
});
