import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/goals/goalSlice";
import { getGoals } from "../redux/goals/goalSlice";

import Spinner from "../components/Spinner";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Plus,
  Trophy,
  Flame
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals,
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!userToken) {
      navigate("/login");
    } else {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [userToken, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // Calculate the stats
  const totalGoals = goals.length;
  const recentGoals = goals.filter(goal => {
    const goalDate = new Date(goal.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return goalDate > weekAgo;
  }).length;

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(word => word[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8 relative overflow-hidden">
          <Card className="border-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary-foreground/20">
                      <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground font-bold">
                        {getUserInitials(userToken?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight">
                        Welcome back, {userToken?.name?.split(" ")[0] || "User"}!
                      </h1>
                      <p className="text-primary-foreground/80 text-lg">
                        Ready to crush your goals today?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center">
                  <Trophy className="h-16 w-16 text-primary-foreground/20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Goals
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalGoals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Your goal collection
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Week
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{recentGoals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Goals added recently
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Streak
              </CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {totalGoals > 0 ? Math.ceil(totalGoals / 2) : 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Day streak
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Goal Form */}
          <div className="lg:col-span-4">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/80 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Plus className="h-5 w-5 text-primary" />
                  Add New Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GoalForm />
              </CardContent>
            </Card>
          </div>

          {/* Goals List */}
          <div className="lg:col-span-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Your Goals
                  </CardTitle>
                  {totalGoals > 0 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      {totalGoals} {totalGoals === 1 ? 'goal' : 'goals'}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.length > 0 ? (
                  <>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto p-2">
                      {goals.map((goal, index) => (
                        <div key={goal._id} className="transform transition-all duration-200 hover:scale-[1.02]">
                          <GoalItem goal={goal} index={index} />
                        </div>
                      ))}
                    </div>
                    {/* Progress Section */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Goal Progress
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {totalGoals} goals created
                        </span>
                      </div>
                      <Progress 
                        value={Math.min((totalGoals / 10) * 100, 100)} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {totalGoals < 10 
                          ? `${10 - totalGoals} more to reach your first milestone!`
                          : "Congratulations! You've reached the first milestone 🎉"
                        }
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center">
                      <Target className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No goals yet
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Start your journey by creating your first goal. Every great achievement begins with a single step.
                    </p>
                    <Badge variant="outline" className="px-4 py-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Create your first goal
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
