import { ISkill } from '../../Product'
import { Chip } from '@mui/material'
import React from 'react'

interface ISkillChipProps {
  skill: ISkill
  onDeleteClick: () => void
}

const SkillChip = ({ skill, onDeleteClick }: ISkillChipProps) => {
  return (
    <Chip
      label={skill.name}
      style={{
        backgroundColor: skill.colors.backgroundColor,
        color: skill.colors.textColor,
        fontFamily: 'Inter',
      }}
      onDelete={onDeleteClick}
    />
  )
}

export default React.memo(SkillChip)
