-- ตาราง Employees
DROP TABLE Employees CASCADE CONSTRAINTS;
CREATE TABLE Employees (
    Employee_ID NUMBER PRIMARY KEY,
    Fname VARCHAR2(50),
    Lname VARCHAR2(50),
    Email VARCHAR2(100),
    Pnumber VARCHAR2(15),
    Password VARCHAR2(100),
    Employee_Status VARCHAR2(20),
    Position_ID NUMBER,
    Department_ID NUMBER,
    Role_ID NUMBER,
    Misses_ID NUMBER,
    FOREIGN KEY (Position_ID) REFERENCES Positions(Position_ID),
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID),
    FOREIGN KEY (Role_ID) REFERENCES Roles(Role_ID),
    FOREIGN KEY (Misses_ID) REFERENCES Misses(Misses_ID)
);

-- ตาราง Departments
DROP TABLE Departments CASCADE CONSTRAINTS;
CREATE TABLE Departments (
    Department_ID NUMBER PRIMARY KEY,
    Department_Name VARCHAR2(100)
);

-- ตาราง Positions
DROP TABLE Positions CASCADE CONSTRAINTS;
CREATE TABLE Positions (
    Position_ID NUMBER PRIMARY KEY,
    Position_Name VARCHAR2(100)
);

-- ตาราง Roles
DROP TABLE Roles CASCADE CONSTRAINTS;
CREATE TABLE Roles (
    Role_ID NUMBER PRIMARY KEY,
    Role_Name VARCHAR2(100)
);

-- ตาราง Buildings
DROP TABLE Buildings CASCADE CONSTRAINTS;
CREATE TABLE Buildings (
    Building_ID NUMBER PRIMARY KEY,
    Building_Name VARCHAR2(100)
);

-- ตาราง Floors
DROP TABLE Floors CASCADE CONSTRAINTS;
CREATE TABLE Floors (
    Floor_ID NUMBER PRIMARY KEY,
    Floor_Number NUMBER,
    Building_ID NUMBER,
    FOREIGN KEY (Building_ID) REFERENCES Buildings(Building_ID)
);

-- ตาราง Rooms
DROP TABLE Rooms CASCADE CONSTRAINTS;
CREATE TABLE Rooms (
    Room_ID NUMBER PRIMARY KEY,
    Name VARCHAR2(100),
    Room_Type VARCHAR2(50),
    Capacity NUMBER,
    Room_Status VARCHAR2(20),
    Description VARCHAR2(255),
    Floor_ID NUMBER,
    Room_Manager_ID NUMBER,
    FOREIGN KEY (Floor_ID) REFERENCES Floors(Floor_ID)
);

-- ตาราง Equipment
DROP TABLE Equipment CASCADE CONSTRAINTS;
CREATE TABLE Equipment (
    Equipment_ID NUMBER PRIMARY KEY,
    Equipment_Name VARCHAR2(100)
);

-- ตาราง Bookings
DROP TABLE Bookings CASCADE CONSTRAINTS;
CREATE TABLE Bookings (
    Booking_ID NUMBER PRIMARY KEY,
    StartDate DATE,
    EndDate DATE,
    StartTime TIMESTAMP,
    EndTime TIMESTAMP,
    Reason VARCHAR2(255),
    Booking_Status VARCHAR2(20),
    CheckIn_Status VARCHAR2(20),
    Room_ID NUMBER,
    Employee_ID NUMBER,
    FOREIGN KEY (Room_ID) REFERENCES Rooms(Room_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employees(Employee_ID)
);

-- ตาราง Summary_Bookings
DROP TABLE Summary_Bookings CASCADE CONSTRAINTS;
CREATE TABLE Summary_Bookings (
    Summary_Booking_ID NUMBER PRIMARY KEY,
    Employee_ID NUMBER,
    Booking_ID NUMBER,
    Room_ID NUMBER,
    TimeStamp TIMESTAMP,
    Booking_Status VARCHAR2(20),
    FOREIGN KEY (Employee_ID) REFERENCES Employees(Employee_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Bookings(Booking_ID),
    FOREIGN KEY (Room_ID) REFERENCES Rooms(Room_ID)
);

-- ตาราง QR_Codes
DROP TABLE QR_Codes CASCADE CONSTRAINTS;
CREATE TABLE QR_Codes (
    QR_ID NUMBER PRIMARY KEY,
    QRCodeData VARCHAR2(255),
    Generated_Date TIMESTAMP,
    ExpirationDate DATE,
    Booking_ID NUMBER,
    FOREIGN KEY (Booking_ID) REFERENCES Bookings(Booking_ID)
);

-- ตาราง Misses
DROP TABLE Misses CASCADE CONSTRAINTS;
CREATE TABLE Misses (
    Misses_ID NUMBER PRIMARY KEY,
    Misses_Count NUMBER,
    Timestamp TIMESTAMP
);
