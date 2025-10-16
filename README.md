
# School Management System

A full-stack School Management System designed to simplify school operations and manage academic activities efficiently. This system provides separate dashboards for **Admin**, **Teacher**, and **Student** roles, enabling smooth handling of all school-related tasks.

---

## Project Description

This School Management System allows schools to manage students, teachers, classes, subjects, attendance, notices, and student complaints. It streamlines administrative tasks, enhances communication, and helps track student performance effectively.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB

---

## Features

### Admin Panel

- Add and manage schools, classes, students, teachers, and subjects
- Create and publish notices
- Track and manage student attendance

### Teacher Panel

- Take student attendance
- Upload student exam marks
- View class and student details

### Student Panel

- View subjects, attendance, and marks
- Raise complaints and track their status

---

## Installation

### Clone the Repository

```bash
git clone "https://github.com/ranjit-dey/school-management-system"
cd school-management-system
````

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

- The backend runs on the port specified in `backend/.env` (`PORT`)
- `backend/.env` example:

```txt
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

- The frontend connects to the backend via `frontend/.env`
- `frontend/.env` example:

```txt
REACT_APP_BASE_URL=http://localhost:5000
MONGO_URL=your_mongodb_connection_string
```

---

## Folder Structure

```bash
school-management-system/
├── backend
│   ├── controllers/   # Controllers for each feature
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── index.js       # Entry point
│   └── package.json
├── frontend
│   ├── src/
│   │   ├── pages/         # Admin, Teacher, Student pages
│   │   ├── components/    # Reusable components
│   │   ├── redux/         # Redux state management
│   │   └── assets/        # Images and icons
│   ├── public/
│   └── package.json
└── README.md
```

---

## Usage

- **Admin**: Manage all school data and monitor operations
- **Teacher**: Update attendance and marks
- **Student**: View progress, subjects, attendance, marks, and submit complaints

---

## Deployment

- **Backend**: Deploy as a Web Service (e.g., Render, Heroku)
- **Frontend**: Deploy as a Static Site (e.g., Render, Vercel)
- Update `REACT_APP_BASE_URL` in frontend `.env` to point to deployed backend URL.

---

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss your plans.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

- **Author:** Ranjit Dey
- **Email:** [ranjitdey05265@gmail.com](mailto:ranjitdey05265@gmail.com)
- **GitHub:** [https://github.com/ranjit-dey](https://github.com/ranjit-dey)
