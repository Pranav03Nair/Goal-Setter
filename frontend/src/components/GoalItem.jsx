import { useDispatch } from "react-redux";
import { deleteGoal } from "../redux/goals/goalSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  Calendar, 
  Target,
  Clock,
  Zap,
  Check
} from "lucide-react";

const GoalItem = ({ goal, index }) => {
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
    });
  };

  const getGoalColor = (index) => {
    const colors = [
      "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300",
      "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300",
      "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300",
      "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-300",
      "bg-pink-500/10 border-pink-500/20 text-pink-700 dark:text-pink-300",
      "bg-teal-500/10 border-teal-500/20 text-teal-700 dark:text-teal-300",
    ];
    return colors[index % colors.length];
  };

  const getIconColor = (index) => {
    const colors = [
      "text-blue-500",
      "text-green-500", 
      "text-purple-500",
      "text-orange-500",
      "text-pink-500",
      "text-teal-500",
    ];
    return colors[index % colors.length];
  };

  // Using same function as delete for now (as requested)
  const handleComplete = () => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <Card className={`border-l-4 ${getGoalColor(index)} transition-all duration-200 hover:shadow-md group`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Target className={`h-4 w-4 ${getIconColor(index)}`} />
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                Goal #{index + 1}
              </Badge>
            </div>
            
            <h3 className="font-medium text-foreground leading-relaxed">
              {goal.text}
            </h3>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Created {formatDate(goal.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{new Date(goal.createdAt).toLocaleTimeString("en-US", { 
                  hour: "numeric", 
                  minute: "2-digit",
                  hour12: true 
                })}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComplete}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-green-500/10 hover:text-green-600"
              title="Mark as completed"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(deleteGoal(goal._id))}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/10 hover:text-destructive"
              title="Delete goal"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>Active goal</span>
            </div>
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              In Progress
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalItem;
