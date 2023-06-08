import React from 'react';

import styles from './eventsCalendar.module.css';

export const eventsCalendarIntro = () => (
  <div className={styles.introWrapper}>
    <h2>Events Calendar Core Component</h2>
    <hr />
    <h3>Summary</h3>
    <p>
      The EventsCalendar component is used to display events in both a calendar
      and a list format. Events are passed to the component in an array of event
      groups, where each event group is a type of event with appropriate helper
      data and wrapper functions. For example, if you wanted to display A/B
      Testing and Event Manager events in the same calendar, there would be two
      event groups passed to the calendar, one for A/B Testing events and one
      for Event Manager events.
    </p>
    <h3>Props</h3>
    <p>
      The EventsCalendar component takes several props: createDisabled,
      eventGroups, onSelectSlot, platforms, and sidebar.
    </p>
    <br />
    <h4>affiliatedProjects (optional)</h4>
    <p>
      The list of projects and affiliated projects that are used to filter
      events in the calendar by project.
    </p>
    <h4>availableViews (optional)</h4>
    <p>
      This list determines which views are available in the calendar. The
      default views are day, week, and month.
    </p>
    <h4>createDisabled</h4>
    <p>Determines whether to disable event creation (true) or not (false).</p>
    <h4>datePickerInfo (optional)</h4>
    <p>
      {`The props and functions that are passed to the calendar when in use by the
      CalendarDatePicker component. If the calendar isn't being used as a date
      picker, then this can be left as null.`}
    </p>
    <h4>eventGroups</h4>
    <p>
      Each event group contains an array of events of a particular type (A/B
      Testing, Coreviz, Event Manager, etc.) as well as appropriate properties
      and wrapper functions for rendering events of that particular type.
    </p>
    <h5>AuthStatus (optional)</h5>
    <p>Type: React Component</p>
    <p>
      Component for displaying Authorization status in List view if applicable
      for event type.
    </p>
    <h5>AuthStatusRules (optional)</h5>
    <p>Type: Object</p>
    <p>
      Contains rules for handling the AuthStatus component. onCheckAuths handles
      checking the authorization, onSelect handles opening the Authorization
      Dialog when the AuthStatus component is clicked, disabled when turned on
      prevents modal from poping up.
    </p>
    <h5>classes</h5>
    <p>Type: Object</p>
    <p>Classes to style the displayed events in the events calendar.</p>
    <h5>CustomEvent</h5>
    <p>Type: React Component</p>
    <p>
      The component that displays the event information in the calendar slot,
      should also open a modal when clicked containing the event info as well as
      a link to the event in Devzone.
    </p>
    <h5>CustomEventProps</h5>
    <p>Type: Object</p>
    <p>Contains additional props to pass to CustomEvent component.</p>
    <h5>customEventStyles</h5>
    <p>Type: Function</p>
    <p>
      Allows for additional styling of the event in the calendar based on other
      properties of the event object as well as selections made in the sidebar
      filters.
    </p>
    <h5>eventDragDrop</h5>
    <p>Type: React Component</p>
    <p>
      Determines what actions/event modifications occur when a user drags/drops
      an event in the calendar, so that appropriate dates can be changed
      according to the start and end dates of the event in the calendar. Leaving
      this null disables drag and dropping of events of the respective type.
    </p>
    <h5>events</h5>
    <p>Type: Array (of Objects)</p>
    <p>
      The list of events, the type property should either already be the same
      string as the event group type or a type property with the same string
      should be assigned to each event by the event group wrapper function (see
      below)
    </p>
    <h5>eventTypes</h5>
    <p>Type: Object</p>
    <p>
      The different categories of the main event type; in Event Manager, the
      keys are the status (approved, rejected, etc), used to style events and
      determine what checkboxes appear in the sidebar in the Sources filters;
      naming should be congruent with the provided classes.
    </p>
    <h5>onFetchEvents</h5>
    <p>Type: Function</p>
    <p>
      The method to fetch events of the eventGroup type. This method will take
      two arguments based on the view type. For example, for a month view, the
      first argument (startRange) will be the beginning of the month before the
      selected month and the second argument (endRange) will be the end of the
      month after the selected month. This is to keep the component from having
      to process events that are not being displayed by the calendar. After
      events are fetched by this method, the wrapper method will be applied to
      make the events compatible with the calendar.
    </p>
    <p>
      The List view of the calendar does not have a start and end range though,
      so the wrapper function should be prepared to take a start and end range
      for displaying events in the calendar for the displayed time range and for
      grabbing all events for the List view.
    </p>
    <h5>GroupLink</h5>
    <p>Type: React Component</p>
    <p>
      The component used to Render a link in the List view of an event in the
      list.
    </p>
    <h5>loading</h5>
    <p>Type: Object</p>
    <p>
      Contains loading status of fetched events for the event group. error
      contains any errors come across during fetching, and isLoading indicates
      whether the event group is currently loading or not.
    </p>
    <h5>modifyEvent</h5>
    <p>Type: Function</p>
    <p>
      {`The function called to modify an event, used to make an API call to modify
      the event on the back end. Called when an event is dragged and dropped.
      This can be left null when the eventDragDrop method isn't passed for the
      same group.`}
    </p>
    <h5>onSelectEvent</h5>
    <p>Type: Function</p>
    <p>
      Function for handling event selection in EventsCalendar, handles opening
      the event details modal
    </p>
    <h5>type</h5>
    <p>Type: String</p>
    <p>
      The type of event (Event Manager, A/B Testing, etc). Should be the same
      string as the type property in the event object that either already exists
      or is added by the wrapper function (see below).
    </p>
    <h5>wrapper</h5>
    <p>Type: Function</p>
    <p>
      The wrapper function to transform events in the events array to be
      compatible with react-big-calendar; this function must give each event the
      following properties if they do not already exist so that events can be
      seen in the calendar:
    </p>
    <ul>
      <li>
        <b>title</b>: the name of the event (string)
      </li>
      <li>
        <b>start</b>: the start date (JS Date object)
      </li>
      <li>
        <b>end</b>: the end date of the event (JS Date object)
      </li>
      <li>
        <b>allDay</b>: whether it is an all day event (bool); if true, events
        will go in the all day section (at the top) in the Day and Week views
        instead of in a particular time slot.
      </li>
      <li>
        <b>type</b>: the devzone event type, so that it can be determined what
        type of actions to take on an event based on the type; should be the
        same string as the eventGroup type property
      </li>
    </ul>
    <p>
      This function also filters events by the specified properties in the
      sidebar filters. There are filters for filtering by environment type,
      platform, tags, and event group properties.
    </p>
    <br />
    <h4>exportEvents</h4>
    <p>
      Function for handing the export of events, ie exporting event data to a
      CSV file
    </p>
    <h4>exportExcludeTypes</h4>
    <p>
      Array of event types (strings) to exclude from event exports. Should be
      same string as eventGroup type.
    </p>
    <h4>onPresetsUpdate</h4>
    <p>Function for handling updating calendar presets</p>
    <h4>openEventInNewTab (optional)</h4>
    <p>
      This boolean determines whether, when a user clicks on the link to the
      event, the event opens in a new tab (true) or not (false). This is false
      by default.
    </p>
    <h4>onSelectSlot (optional)</h4>
    <p>
      This determines the action(s) to be taken when a calendar time slot is
      clicked or the Create Event button is pressed. In Event Manager, a
      function to display a modal for event creation is passed to this prop. It
      is recommended to leave this blank if more than one eventGroup is passed
      to the calendar.
    </p>
    <h4>permissinos</h4>
    <p>Set to true when user viewing calendar is admin user.</p>
    <h4>platforms</h4>
    <p>
      The array of platform names given to the Events Calendar. Used to filter
      events by platform in the Platforms filters.
    </p>
    <h4>presetOptions</h4>
    <p>Type: Object</p>
    <p>Contains user permissions for controlling callendar access rights.</p>
    <p>adminUser: Gives access to sensitive features like calendar presets.</p>
    <p>
      emUser: Event write access for any edit actions allowed from the calendar.
    </p>
    <p>
      staffUser: Set to true when user viewing calendar is staff user for
      work-in-progress features.
    </p>
    <h4>projectId (optional)</h4>
    <p>The id of the main project for the calendar</p>
    <h4>sidebar</h4>
    <p>
      This controls whether or not the EventsCalendar sidebar is displayed. This
      sidebar contains a mini calendar and filters for the calendar events.
    </p>
  </div>
);
