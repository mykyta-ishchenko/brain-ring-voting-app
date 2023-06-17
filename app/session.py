from dataclasses import dataclass
from datetime import datetime
from queue import Queue
from random import randint
from typing import Optional
from urllib import request


@dataclass
class Vote:
    player: str
    time: datetime

    def __eq__(self, other):
        return self.player == other.player


class Session:
    def __init__(self) -> None:
        self._players: set[str] = set()
        self._votes = Queue()
        self._voting_start_time = datetime.now()
        self._is_vote_active = False

    def start_round(self) -> None:
        self._voting_start_time = datetime.now()
        self._votes = Queue()
        self._is_vote_active = True

    def end_round(self) -> None:
        self._is_vote_active = False

    def vote(self, player: str) -> None:
        if self.is_round_active() and Vote(player, datetime.now()) not in self._votes.queue:
            self._votes.put(Vote(player, datetime.now()))

    def add_player(self, player: str) -> None:
        if not player:
            player = "none"
        self._players.add(player)

    def get_players(self) -> list:
        return list(self._players)

    def is_round_active(self) -> bool:
        return self._is_vote_active

    def get_result(self) -> list:
        result = []
        for vote in self._votes.queue:
            time_delta = vote.time - self._voting_start_time
            result.append(f"{vote.player} - {time_delta.seconds} секунд(а)")
        return result
