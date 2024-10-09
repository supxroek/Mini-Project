-- EMPLOYEES
/*
INSERT INTO Employees (Employee_ID, Fname, Lname, Email, Pnumber, Password, Employee_Status, Position_ID, Department_ID, Role_ID, Misses_ID) 
VALUES (1, 'John', 'Doe', 'john.doe@example.com', '0123456789', 'password1', 'Active', 1, 1, 1, NULL);
INSERT INTO Employees (Employee_ID, Fname, Lname, Email, Pnumber, Password, Employee_Status, Position_ID, Department_ID, Role_ID, Misses_ID) 
VALUES (2, 'Jane', 'Smith', 'jane.smith@example.com', '0987654321', 'password2', 'Active', 2, 2, 2, NULL);
INSERT INTO Employees (Employee_ID, Fname, Lname, Email, Pnumber, Password, Employee_Status, Position_ID, Department_ID, Role_ID, Misses_ID) 
VALUES (3, 'Alice', 'Brown', 'alice.brown@example.com', '0456789123', 'password3', 'Inactive', 1, 1, 1, NULL);
INSERT INTO Employees (Employee_ID, Fname, Lname, Email, Pnumber, Password, Employee_Status, Position_ID, Department_ID, Role_ID, Misses_ID) 
VALUES (4, 'Bob', 'Johnson', 'bob.johnson@example.com', '0543216789', 'password4', 'Active', 2, 2, 2, NULL);
INSERT INTO Employees (Employee_ID, Fname, Lname, Email, Pnumber, Password, Employee_Status, Position_ID, Department_ID, Role_ID, Misses_ID) 
VALUES (5, 'Charlie', 'Davis', 'charlie.davis@example.com', '0678901234', 'password5', 'Active', 1, 1, 1, NULL);

-- DEPARTMENTS
INSERT INTO Departments (Department_ID, Department_Name) VALUES (1, 'HR');
INSERT INTO Departments (Department_ID, Department_Name) VALUES (2, 'IT');
INSERT INTO Departments (Department_ID, Department_Name) VALUES (3, 'Marketing');
INSERT INTO Departments (Department_ID, Department_Name) VALUES (4, 'Finance');
INSERT INTO Departments (Department_ID, Department_Name) VALUES (5, 'Sales');

-- POSITIONS
INSERT INTO Positions (Position_ID, Position_Name) VALUES (1, 'Manager');
INSERT INTO Positions (Position_ID, Position_Name) VALUES (2, 'Staff');
INSERT INTO Positions (Position_ID, Position_Name) VALUES (3, 'Intern');
INSERT INTO Positions (Position_ID, Position_Name) VALUES (4, 'Director');
INSERT INTO Positions (Position_ID, Position_Name) VALUES (5, 'Executive');

-- ROLES
INSERT INTO Roles (Role_ID, Role_Name) VALUES (1, 'Admin');
INSERT INTO Roles (Role_ID, Role_Name) VALUES (2, 'User');
INSERT INTO Roles (Role_ID, Role_Name) VALUES (3, 'Guest');
INSERT INTO Roles (Role_ID, Role_Name) VALUES (4, 'Moderator');
INSERT INTO Roles (Role_ID, Role_Name) VALUES (5, 'Super Admin');

-- BUILDINGS
INSERT INTO Buildings (Building_ID, Building_Name) VALUES (1, 'Building A');
INSERT INTO Buildings (Building_ID, Building_Name) VALUES (2, 'Building B');
INSERT INTO Buildings (Building_ID, Building_Name) VALUES (3, 'Building C');
INSERT INTO Buildings (Building_ID, Building_Name) VALUES (4, 'Building D');
INSERT INTO Buildings (Building_ID, Building_Name) VALUES (5, 'Building E');

-- FLOORS
INSERT INTO Floors (Floor_ID, Floor_Number, Building_ID) VALUES (1, 1, 1);
INSERT INTO Floors (Floor_ID, Floor_Number, Building_ID) VALUES (2, 2, 1);
INSERT INTO Floors (Floor_ID, Floor_Number, Building_ID) VALUES (3, 1, 2);
INSERT INTO Floors (Floor_ID, Floor_Number, Building_ID) VALUES (4, 2, 2);
INSERT INTO Floors (Floor_ID, Floor_Number, Building_ID) VALUES (5, 1, 3);

-- ROOMS
INSERT INTO Rooms (Room_ID, Name, Room_Type, Capacity, Room_Status, Description, Floor_ID, Room_Manager_ID) 
VALUES (1, 'Conference Room A', 'Standard', 10, 'Available', 'Conference room with projector', 1, NULL);
INSERT INTO Rooms (Room_ID, Name, Room_Type, Capacity, Room_Status, Description, Floor_ID, Room_Manager_ID) 
VALUES (2, 'Meeting Room B', 'Special', 5, 'Available', 'Meeting room for small groups', 2, NULL);
INSERT INTO Rooms (Room_ID, Name, Room_Type, Capacity, Room_Status, Description, Floor_ID, Room_Manager_ID) 
VALUES (3, 'Training Room C', 'Standard', 20, 'Available', 'Room for training sessions', 1, NULL);
INSERT INTO Rooms (Room_ID, Name, Room_Type, Capacity, Room_Status, Description, Floor_ID, Room_Manager_ID) 
VALUES (4, 'Board Room D', 'Special', 12, 'Available', 'Room for board meetings', 2, NULL);
INSERT INTO Rooms (Room_ID, Name, Room_Type, Capacity, Room_Status, Description, Floor_ID, Room_Manager_ID) 
VALUES (5, 'Workshop Room E', 'Standard', 15, 'Available', 'Room for workshops', 1, NULL);

-- Equipment
INSERT INTO Equipment (Equipment_ID, Equipment_Name) VALUES (1, 'Projector');
INSERT INTO Equipment (Equipment_ID, Equipment_Name) VALUES (2, 'Whiteboard');
INSERT INTO Equipment (Equipment_ID, Equipment_Name) VALUES (3, 'Teleconference System');
INSERT INTO Equipment (Equipment_ID, Equipment_Name) VALUES (4, 'Video Conferencing System');
INSERT INTO Equipment (Equipment_ID, Equipment_Name) VALUES (5, 'Flip Chart');
*/

-- Bookings
INSERT INTO Bookings (Booking_ID, StartDate, EndDate, StartTime, EndTime, Reason, Booking_Status, CheckIn_Status, Room_ID, Employee_ID) 
VALUES (1, TO_DATE('2024-10-01', 'YYYY-MM-DD'), TO_DATE('2024-10-01', 'YYYY-MM-DD'), TO_TIMESTAMP('09:00', 'HH24:MI'), TO_TIMESTAMP('10:00', 'HH24:MI'), 'Team Meeting', 'Confirmed', 'Not Checked In', 1, 1);
INSERT INTO Bookings (Booking_ID, StartDate, EndDate, StartTime, EndTime, Reason, Booking_Status, CheckIn_Status, Room_ID, Employee_ID) 
VALUES (2, TO_DATE('2024-10-02', 'YYYY-MM-DD'), TO_DATE('2024-10-02', 'YYYY-MM-DD'), TO_TIMESTAMP('11:00', 'HH24:MI'), TO_TIMESTAMP('12:00', 'HH24:MI'), 'Project Discussion', 'Pending', 'Not Checked In', 2, 2);
INSERT INTO Bookings (Booking_ID, StartDate, EndDate, StartTime, EndTime, Reason, Booking_Status, CheckIn_Status, Room_ID, Employee_ID) 
VALUES (3, TO_DATE('2024-10-03', 'YYYY-MM-DD'), TO_DATE('2024-10-03', 'YYYY-MM-DD'), TO_TIMESTAMP('13:00', 'HH24:MI'), TO_TIMESTAMP('14:00', 'HH24:MI'), 'Client Meeting', 'Confirmed', 'Not Checked In', 3, 1);
INSERT INTO Bookings (Booking_ID, StartDate, EndDate, StartTime, EndTime, Reason, Booking_Status, CheckIn_Status, Room_ID, Employee_ID) 
VALUES (4, TO_DATE('2024-10-04', 'YYYY-MM-DD'), TO_DATE('2024-10-04', 'YYYY-MM-DD'), TO_TIMESTAMP('15:00', 'HH24:MI'), TO_TIMESTAMP('16:00', 'HH24:MI'), 'Staff Training', 'Cancelled', 'Not Checked In', 4, 2);
INSERT INTO Bookings (Booking_ID, StartDate, EndDate, StartTime, EndTime, Reason, Booking_Status, CheckIn_Status, Room_ID, Employee_ID) 
VALUES (5, TO_DATE('2024-10-05', 'YYYY-MM-DD'), TO_DATE('2024-10-05', 'YYYY-MM-DD'), TO_TIMESTAMP('10:00', 'HH24:MI'), TO_TIMESTAMP('11:00', 'HH24:MI'), 'Weekly Review', 'Confirmed', 'Checked In', 5, 1);


-- Summary_Bookings
INSERT INTO Summary_Bookings (Summary_Booking_ID, Employee_ID, Booking_ID, Room_ID, TimeStamp, Booking_Status) 
VALUES (1, 1, 1, 1, CURRENT_TIMESTAMP, 'Confirmed');
INSERT INTO Summary_Bookings (Summary_Booking_ID, Employee_ID, Booking_ID, Room_ID, TimeStamp, Booking_Status) 
VALUES (2, 2, 2, 2, CURRENT_TIMESTAMP, 'Pending');
INSERT INTO Summary_Bookings (Summary_Booking_ID, Employee_ID, Booking_ID, Room_ID, TimeStamp, Booking_Status) 
VALUES (3, 1, 3, 3, CURRENT_TIMESTAMP, 'Confirmed');
INSERT INTO Summary_Bookings (Summary_Booking_ID, Employee_ID, Booking_ID, Room_ID, TimeStamp, Booking_Status) 
VALUES (4, 2, 4, 4, CURRENT_TIMESTAMP, 'Cancelled');
INSERT INTO Summary_Bookings (Summary_Booking_ID, Employee_ID, Booking_ID, Room_ID, TimeStamp, Booking_Status) 
VALUES (5, 1, 5, 5, CURRENT_TIMESTAMP, 'Confirmed');

-- QR_Codes
INSERT INTO QR_Codes (QR_ID, QRCodeData, Generated_Date, ExpirationDate, Booking_ID) 
VALUES (1, 'QR123456', CURRENT_TIMESTAMP, TO_DATE('2024-10-01', 'YYYY-MM-DD'), 1);
INSERT INTO QR_Codes (QR_ID, QRCodeData, Generated_Date, ExpirationDate, Booking_ID) 
VALUES (2, 'QR654321', CURRENT_TIMESTAMP, TO_DATE('2024-10-02', 'YYYY-MM-DD'), 2);
INSERT INTO QR_Codes (QR_ID, QRCodeData, Generated_Date, ExpirationDate, Booking_ID) 
VALUES (3, 'QR789012', CURRENT_TIMESTAMP, TO_DATE('2024-10-03', 'YYYY-MM-DD'), 3);
INSERT INTO QR_Codes (QR_ID, QRCodeData, Generated_Date, ExpirationDate, Booking_ID) 
VALUES (4, 'QR345678', CURRENT_TIMESTAMP, TO_DATE('2024-10-04', 'YYYY-MM-DD'), 4);
INSERT INTO QR_Codes (QR_ID, QRCodeData, Generated_Date, ExpirationDate, Booking_ID) 
VALUES (5, 'QR987654', CURRENT_TIMESTAMP, TO_DATE('2024-10-05', 'YYYY-MM-DD'), 5);

COMMIT;

-- Misses
/*
INSERT INTO Misses (Misses_ID, Misses_Count, Timestamp) 
VALUES (1, 0, CURRENT_TIMESTAMP);
INSERT INTO Misses (Misses_ID, Misses_Count, Timestamp) 
VALUES (2, 1, CURRENT_TIMESTAMP);
INSERT INTO Misses (Misses_ID, Misses_Count, Timestamp) 
VALUES (3, 2, CURRENT_TIMESTAMP);
INSERT INTO Misses (Misses_ID, Misses_Count, Timestamp) 
VALUES (4, 1, CURRENT_TIMESTAMP);
INSERT INTO Misses (Misses_ID, Misses_Count, Timestamp) 
VALUES (5, 0, CURRENT_TIMESTAMP);
*/