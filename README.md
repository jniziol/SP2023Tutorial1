## Getting Started

First, install all the packages:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

You'll then need to add your database connection string to the `.env` file and run prisma migrations.

Finally, open [http://localhost:3000/auth/sign-up](http://localhost:3000/auth/sign-up) with your browser to see the sign-up form.

In this project we are using:

- [TailwindCSS](https://tailwindcss.com/) as our CSS framework.
- [DaisyUI](https://daisyui.com/) for our TailwindCSS components
- [Prisma](https://www.prisma.io/) to help us work with our database.
- [ReactHookForm](https://www.react-hook-form.com/) to manage our forms.
- [Yup](https://github.com/jquense/yup) for our validations
