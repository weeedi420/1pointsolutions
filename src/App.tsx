import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccessProvider } from "@/contexts/AccessContext";
import Index from "./pages/Index";
import Calls from "./pages/Calls";
import Content from "./pages/Content";
import Images from "./pages/Images";
import Keywords from "./pages/Keywords";
import Analytics from "./pages/Analytics";
import Ads from "./pages/Ads";
import Social from "./pages/Social";
import Email from "./pages/Email";
import SEO from "./pages/SEO";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobManagement from "./pages/JobManagement";
import JobDashboard from "./pages/JobDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calls" element={<Calls />} />
            <Route path="/content" element={<Content />} />
            <Route path="/images" element={<Images />} />
            <Route path="/keywords" element={<Keywords />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/social" element={<Social />} />
            <Route path="/email" element={<Email />} />
            <Route path="/seo" element={<SEO />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/job-management" element={<JobManagement />} />
            <Route path="/job-dashboard" element={<JobDashboard />} />
          </Routes>
        </BrowserRouter>
      </AccessProvider>
    </QueryClientProvider>
  );
}

export default App;