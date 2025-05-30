import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import TeamPage from "@/pages/team";
import AgendasPage from "@/pages/agendas";
import NotFound from "@/pages/not-found";
import SponsorsPage from "@/pages/sponsors";
import PortfolioPage from "@/pages/portfolio";

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/team" component={TeamPage} />
        <Route path="/agendas" component={AgendasPage} />
        <Route path="/sponsors" component={SponsorsPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <div className="flex-grow">
            <AppRouter />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
