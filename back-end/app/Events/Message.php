<?php

namespace App\Events;


use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */

    public function __construct(
        public string $username,
        public string $message
    )
    {
        $this->username = $username;
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return 'chat';
    }

    public function broadcastAs()
    {
        return 'message';
    }
}

