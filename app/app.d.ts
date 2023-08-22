/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./(auth)/lib/lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    email_verified: boolean;
  };
  type DatabaseSessionAttributes = {};
}
