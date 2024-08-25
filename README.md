# **[wordliner GmbH](https://wordliner.com) - Code Challange**

![immobilienbranche](./.repository/immobilienbranche.png)

## **Installation**

To install the project, follow these steps:

```
git clone https://github.com/caiankeller/wordliner.git wordliner@caiankeller
```

```
cd wordliner@caiankeller
```

```
npm install
```

### **Usage**

To run the project, use the command:

```
npm run dev
```

The command will launch Nuxt server on http://localhost:3000/

### **Features**

I've added a few things to the application, trying to show how I would work with Nuxt, some changes include: alias configuration for the main folders, Typescript configuration that won't allow the application to be deployed in the event of an error (the same for eslint), dependencies such as @nuxt/fonts’ and “@nuxt/eslint”, and minor tailwindCSS configs.

#### **and some new commands are**

```
npm run lint
```

```
npm run lint:fix
```

```
npm run test
```

### **Project Structure**

I didn't invent anything, I followed what [Nuxt recommends](https://nuxt.com/docs/guide/directory-structure/app) (I don't agree with this thing about putting everything in the root and I'd like to work with the src folder). Everything is quite simple, my only point is that, depending on the growth of the project, I would start organising the components folder, grouping them according to their functions and relationships, but this is something (at least for me) that undermines the component's reusability, so I would think very carefully about it.

### **Considerations**

Even though this is my first Vue project, I'm happy with the initial results, despite some minor inconsistencies that I only can be addressed with time. As a React developer, transitioning to Vue felt surprisingly smooth. I was particularly impressed by v directive from Vue that are really easy to work with. Nuxt's native features, that greatly developer experience. While I didn't use Pinia in the most conventional way (using v-models and updating state using Watchers, which dramastically reduced repetitive code), it offered a similar, intuitive approach to [Zustand](https://zustand-demo.pmnd.rs/) (that I am very familiar with).

The project is well commented (perhaps too well commented) and I explain every decision made through them, what I would do better, how it could be done better, what I knew for a fact could be a problem in the future, most of this I cover in them, so enjoy if you want to take a look.

Sometimes [the mocking API service](https://mockapi.io/) really falls short. So if you try delete a property and it doesn't work, it's some problem with the service (Yes, it does return a 200 telling that the property has been deleted, even though it wasn't). That explain too the lack of error handling in the form.

### **Tests**

I haven't implemented many crazy tests, I've done the basics. It's been very difficult to find free time, but maybe I'll implement some before the deadline. It's also been two years since I wrote any tests.
