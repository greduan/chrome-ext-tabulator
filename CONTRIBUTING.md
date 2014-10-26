# Contributing Guidelines

Here are some guidelines to follow when contributing to this repo or any repo
that I (Greduan) own or maintain.

## If you are contributing with a bug report, feature request etc.

Please make it as detailed as possible.  If you just tell me you are getting an
error, that doesn't allow me to help you at all, thus I won't help you.

Also make sure that the bug hasn't been reported already, if it has been
reported previously your issue will be closed and you will be pointed to the
existing issue.

When reporting a bug, I expect the following information:

- What you were doing when you got the error.
- What you _expected_ to happen and what _actually_ happened.
- If you get an error message, please post it enclosed in the triple backticks
  that GitHub provides (\`\`\`).
- The versions of stuff.
  - Your OS and its version.
  - The version of my software.
  - The version of your browser (if it applies).
  - If the software is running on a platform (e.g. Java, Node.js etc.) also post
	the version of that.
- If possible, a GIF of the bug.

These are just guidelines, they are not rules, but treat them as if they were.
Simply post _as much_ information as you possibly can, in order to make the
process of fixing the problem as easy as possible for me.

Of course, if it is a feature request you only have to explain in detail what
you would like, how it would work, why you would like it etc.

## If you are contributing with code

1. Fork the repo.

2. Make a new branch for your feature or bug fix.  Optionally, you can name it
   in one of the following ways:
  - If a bug fix, name it 'bug-name', where 'name' is whatever you decide to
	name it.
  - If a new feature, name it 'feature-name', where 'name' is whatever you
	decide to name it.

3. Make your changes and commit them, make sure your commit messages are not
   rambling commit messages: <http://stopwritingramblingcommitmessages.com/>
   Remember to Commit early, Commit often.

4. Make sure your code adds tests (if the repo has a `test/` folder) and also
   make sure your code passes the JSLint/JSHint with the `gulp` command (if the
   repo has JavaScript).

5. Open a pull request for your bug/feature branch.  Open it for the 'dev'
   branch, if there is one, if there isn't open it for the 'master' branch.
   Make sure to make the pull request informative of what your pull request
   does, how etc., make it easy for me to pull it in.

If possible, please provide a GIF with the change so I can see the changes it
makes right away, without having to check your code, makes it quicker and easier
for your pull request to get merged.

## The CONTRIBUTORS file

By making a pull request to this project and it being pulled in you will
automatically be added to the CONTRIBUTORS file by me.  If you'd like to be
exempted from this just say so in the pull request.

You can also add your line to the pull request or tell me what you'd like the
line to be.  If you don't, I will make a line from the information you have
published in GitHub and Git.
