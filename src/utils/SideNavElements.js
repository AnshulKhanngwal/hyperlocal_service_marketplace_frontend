import Booking from "../components/Booking";
import Feedback from "../components/Feedback";
import { Notification } from "../components/Notification";
import Report from "../components/Report";
import Service from "../components/Service";
import SignOut from "../components/SignOut";
import Users from "../components/Users";

export const SideNavElements = {
      "CUSTOMER": [
        {
            "name":"Service", 
            "component":Service
        }, 
        {
            "name":"Bookings",
            "component":Booking
        },
        {
            "name":"Feedback",
            "component":Feedback
        },
        {
            "name":"Notification",
            "component":Notification
        },
        {
            "name":"Sign Out",
            "component":SignOut
        }
    ],
    "PROVIDER": [
        {
            "name":"Bookings",
            "component":Booking
        },
        {
            "name":"Service", 
            "component":Service
        }, 
        {
            "name":"Feedback",
            "component":Feedback
        },
        {
            "name":"Notification",
            "component":Notification
        },
        {
            "name":"Sign Out",
            "component":SignOut
        }
    ],
    "ADMIN": [
        {
            "name":"Users",
            "component":Users
        },
        {
            "name":"Bookings",
            "component":Booking
        },
        {
            "name":"Service", 
            "component":Service
        }, 
        {
            "name":"Feedback",
            "component":Feedback
        },
        {
            "name":"Reports",
            "component":Report
        },
        {
            "name":"Notification",
            "component":Notification
        },
        {
            "name":"Sign Out",
            "component":SignOut
        }
    ]
}