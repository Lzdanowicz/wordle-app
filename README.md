# wordle-app

## How to Start the Application

To run the application, follow these steps:

1. **Clone the Repository:**
  ```bash
  git clone https://github.com/lzdanowicz/wordle-app.git
  cd wordle-app
  npm install
  npm run start

## Trade-offs and Design Decisions

During the development of this application, a few trade-offs and design decisions were made to balance complexity, maintainability, and performance. Below are some of the key considerations:

### 1. **Context vs. Container Component for Application Logic**
I chose **not to use React Context** for passing global data down to leaf components. Instead, the **container component** was able to manage the necessary functions without introducing too much complexity. 

- **Why not Context?**
  In this case, the component hierarchy was shallow enough that the container component could efficiently handle the required state and functions. Adding Context at this stage would have increased abstraction without a clear need, potentially making the app harder to maintain in the short term.

- **When Context might be helpful:**
  If the application grows, with deeper component trees or additional features requiring shared state, using **Context** could provide a cleaner solution. In that scenario, the logic handled by the container component could be **abstracted into a custom hook** using Context, reducing prop drilling and improving scalability.


### 2. **Refactoring Guess Data Structure for Simplicity and Single Responsibility**
Initially, I used **a single array** to store both previous guesses and the markings (correct, incorrect, or misplaced letters). However, I later refactored this to use **separate data structures**—one for the guesses and another for the letter markings. 

- **Rationale:**  
  This change aligns with the **Single Responsibility Principle (SRP)**, as it separates concerns between guessing logic and letter marking. This refactor resulted in a cleaner and more focused `GuessRow` component, reducing the amount of internal logic it needs to manage.

- **Trade-off:**  
  While this refactor improved clarity, it introduced some **duplicated logic**. Specifically, the word comparison logic is now handled in both the **container component** and the **GuessRow component**. This duplication is a trade-off to keep individual components focused on their own responsibilities.

---

These design decisions reflect a balance between **simplicity, scalability, and maintainability**. As the application evolves, these trade-offs may need to be revisited to accommodate new requirements or improvements.
