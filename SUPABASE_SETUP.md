# Connect the shop to a database (about 20 minutes)

After this, your mom can change prices and stock from her phone at `your-site/#/admin`, and the website updates straight away.
Until you finish these steps the shop keeps working with the sample fish.

## 1. Create a free Supabase project
1. Go to supabase.com and sign up (free plan is enough to start).
2. Click **New project**. Name it `babbis-dry-fish`. Choose the region closest to your customers (for India, **Mumbai / ap-south-1** if offered).
3. Create a database password and **save it somewhere safe**. Wait a minute or two while it sets up.

## 2. Create the tables
1. In Supabase open **SQL Editor** and click **New query**.
2. Open `supabase/schema.sql` from this project, copy everything, paste it, and click **Run**. You should see "Success".
3. Optional, to start with the sample fish: do the same with `supabase/seed.sql`.

This also turns on the security rules, so only admin accounts can change products. Customers can only read the products that are switched on.

## 3. Create your mom's admin login
1. Go to **Authentication** then **Users** then **Add user** then **Create new user**.
2. Enter an email and a password she can remember. Tick **Auto Confirm User** if you see it.
3. Click the new user and copy the **User UID** (a long code like `1f6b...`).

## 4. Make that user an admin
In **SQL Editor** run this, replacing the code with the User UID you copied:

```sql
insert into public.admins (user_id) values ('PASTE-THE-USER-UID-HERE');
```

## 5. Connect the website
1. In Supabase open **Project Settings** then **API**. Copy the **Project URL** and the **anon / publishable** key.
2. In this project, copy `.env.example` to a new file named `.env` and paste the two values.
3. Run `npm install` once (a new package was added), then restart `npm run dev`.
4. Open `http://localhost:5173/#/admin` and sign in.

## 6. Stop strangers creating accounts (recommended)
**Authentication** then **Sign In / Providers** (or Settings) and turn **off** "Allow new users to sign up".
Extra accounts could not edit anything anyway, but there is no reason to allow them.

## 7. When you deploy to Vercel
Add the same two values (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in Vercel: **Project, Settings, Environment Variables**, then redeploy.
Tell your mom to bookmark `your-website.com/#/admin` on her phone.

## Safety rules
- The **anon / publishable** key in `.env` is meant to be public. The **secret / service_role** key must never go in this project or on GitHub.
- Never commit the `.env` file (it is already listed in `.gitignore`).
- Do not share the admin password. To remove someone, delete their row from the `admins` table.

## If something does not work
| What you see | Likely cause |
| --- | --- |
| "Admin is not set up yet" | `.env` missing or not filled in, or the site was not restarted after creating it |
| "Wrong email or password" | Check the user in Authentication, Users. Reset the password there if needed |
| "This account is not an admin" | Step 4 was skipped or used a different User UID |
| Shop shows "could not load the fish list" | Step 2 not run, or the Project URL or key is wrong |
| Shop is empty | No fish added yet: run `seed.sql` or use "+ Add fish" in the admin page |
