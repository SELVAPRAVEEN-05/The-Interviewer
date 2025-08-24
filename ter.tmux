#!/bin/bash
SESSION="interviewproject"
tmux new-session -d -s $SESSION
tmux rename-window -t $SESSION:0 'interview'
tmux send-keys -t $SESSION:0 'cd client  && npm run dev' C-m
tmux split-window -h -t $SESSION:0
tmux send-keys -t $SESSION:0.1 'cd server && npm run dev' C-m
tmux set-option -g mouse on
tmux attach -t $SESSION
