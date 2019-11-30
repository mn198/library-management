// icons
import Dashboard from "@material-ui/icons/Dashboard";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HistoryIcon from '@material-ui/icons/History';
import ContactsIcon from '@material-ui/icons/Contacts';
// core components/views for Admin layout
import DashboardPage from './pages/Dashboard/Dashboard';
import Readers from './pages/Readers/Readers';
import Books from './pages/Books/Books';
import Lendings from './pages/BookLending/BookLending';
import LendingHistory from './pages/LendingHistory/LendingHistory';
import Users from './pages/Users/Users';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/readers",
    name: "Đọc giả",
    icon: AccessibilityIcon,
    component: Readers,
    layout: "/admin" 
  },
  {
    path: "/books",
    name: "Sách",
    icon: LibraryBooksIcon,
    component: Books,
    layout: "/admin" 
  },
  {
    path: "/lendings",
    name: "Mượn trả",
    icon: AccountBalanceWalletIcon,
    component: Lendings,
    layout: "/admin"
  },
  {
    path: "/history",
    name: "Lịch sử",
    icon: HistoryIcon,
    component: LendingHistory,
    layout: "/admin"  
  },
  {
    path: "/users",
    name: "Người dùng",
    icon: ContactsIcon,
    component: Users,
    layout: "/admin"
  }

];

export default dashboardRoutes;