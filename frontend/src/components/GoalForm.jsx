import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../redux/goals/goalSlice";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Target } from "lucide-react";

const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(createGoal({ text }));
      setText("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text" className="text-sm font-medium flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          What is your goal?
        </Label>
        <Textarea
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your goal in detail... (e.g., 'Read 12 books this year', 'Exercise 30 minutes daily')"
          className="min-h-[100px] resize-none focus:ring-2 focus:ring-primary/20"
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Be specific and make it measurable for better results!
        </p>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
        disabled={!text.trim()}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Goal
      </Button>
    </form>
  );
};

export default GoalForm;
