import React from 'react';
import TimelineEvent from './time_line_event/TimeLineEvent';

const Timeline = ({ events, nombreEquipoLocal, nombreEquipoVisitante }) => {
    return (
        <div className="flex flex-col items-center w-[100%] mr-[8%] text-sm xs360:text-2xl sm550:text-3xl text-center">
            {events.map((event, index) => (
                <TimelineEvent
                    key={index}
                    time={event.time}
                    team={event.team}
                    eventType={event.type}
                    player={event.player}
                    playerOut={event.playerOut}
                    playerIn={event.playerIn}
                    eventIcon={event.eventIcon}
                    nombreEquipoLocal={ nombreEquipoLocal }
                    nombreEquipoVisitante={ nombreEquipoVisitante }
                />
            ))}
            {/* <div className="text-center text-gray-600 my-2">--- FJ ---</div> */}
        </div>
    );
};

export default Timeline;
