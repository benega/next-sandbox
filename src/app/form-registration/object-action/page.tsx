import { z } from "zod";
import { RegistrationForm } from "./registration-form";
import { schema } from "./registration-schema";

export default function Page() {
  const onDataAction = async (data: z.infer<typeof schema>) => {
    "use server";
    const parsed = schema.safeParse(data);

    if (parsed.success) {
      console.log("User registered", parsed.data);
      return { message: "User registered", user: parsed.data };
    }

    return {
      message: "Validation error",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  };

  return (
    <div>
      <h1>Client Side Validation Form</h1>
      <div className="mx-auto max-w-xl">
        <RegistrationForm onDataAction={onDataAction} />
      </div>
    </div>
  );
}
