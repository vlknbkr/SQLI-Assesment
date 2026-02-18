# SQLI QA Automation Home Task (Playwright + TypeScript)

This project contains the automation solution for the SQLI Quality Assurance assessment, featuring both UI and API test automation using [Playwright](https://playwright.dev/) and TypeScript.

## 🚀 Technologies

- **Framework**: Playwright
- **Language**: TypeScript
- **Validation**: Zod (for API schema validation)
- **Pattern**:
    - **UI**: Page Object Model (POM)
    - **API**: Service Layer pattern

## 📂 Project Structure

- `tests/ui`: Contains UI test specifications.
- `tests/api`: Contains API test specifications.
- `src`: Source code including Page Objects and API services.
- `results`: Directory where test results are stored.

## 🛠️ Prerequisites

- **Node.js**: Ensure you have Node.js installed (LTS version recommended).

## 📥 Installation

1.  Clone the repository.
2.  Install dependencies:

```bash
npm install
```

3.  Install Playwright browsers:

```bash
npx playwright install
```

## ▶️ Running Tests

### Run All Tests

To run all tests (both UI and API) in parallel:

```bash
npm test
```

### Run UI Tests Only

To run only the UI automation tests:

```bash
npm run test:web
```

### Run API Tests Only

To run only the API automation tests:

```bash
npm run test:api
```

## 📊 Reporting

After the test run completes, you can view the HTML report by running:

```bash
npm run report
```

Reports are generated using the standard Playwright HTML reporter.