import { z } from "zod";
import { RegistrationForm } from "./registration-form";
import { schema } from "./registration-schema";

export default function Page() {
  const onFormAction = async (
    prevState: {
      message: string;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    formData: FormData
  ) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);

    console.log("onFormAction", parsed);

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
      <h1>FormData Action using useActionState</h1>
      <div className="mx-auto max-w-xl">
        <RegistrationForm onFormAction={onFormAction} />
      </div>
    </div>
  );
}
